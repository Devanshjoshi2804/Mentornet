"use client";

import React, { useEffect, useRef, useState } from "react";
import { useIsVideoCompleted } from "@/lib/videoVerification";
import { CheckCircle, Pause, Play, Volume2, VolumeX, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// YouTube iframe API types
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
  
  namespace YT {
    interface PlayerEvent {
      target: Player;
    }
    
    interface OnStateChangeEvent {
      data: PlayerState;
      target: Player;
    }
    
    enum PlayerState {
      UNSTARTED = -1,
      ENDED = 0,
      PLAYING = 1,
      PAUSED = 2,
      BUFFERING = 3,
      CUED = 5
    }
    
    interface Player {
      destroy(): void;
      getCurrentTime(): number;
      getDuration(): number;
      getVideoUrl(): string;
      getVolume(): number;
      pauseVideo(): void;
      playVideo(): void;
      seekTo(seconds: number, allowSeekAhead: boolean): void;
      mute(): void;
      unMute(): void;
      isMuted(): boolean;
      setVolume(volume: number): void;
    }
    
    interface PlayerOptions {
      videoId: string;
      width?: number | string;
      height?: number | string;
      playerVars?: {
        autoplay?: 0 | 1;
        cc_load_policy?: 0 | 1;
        color?: 'red' | 'white';
        controls?: 0 | 1 | 2;
        disablekb?: 0 | 1;
        enablejsapi?: 0 | 1;
        end?: number;
        fs?: 0 | 1;
        hl?: string;
        iv_load_policy?: 1 | 3;
        list?: string;
        listType?: 'playlist' | 'search' | 'user_uploads';
        loop?: 0 | 1;
        modestbranding?: 0 | 1;
        origin?: string;
        playlist?: string;
        playsinline?: 0 | 1;
        rel?: 0 | 1;
        start?: number;
        widget_referrer?: string;
      };
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: OnStateChangeEvent) => void;
        onPlaybackQualityChange?: (event: any) => void;
        onPlaybackRateChange?: (event: any) => void;
        onError?: (event: any) => void;
        onApiChange?: (event: any) => void;
      };
    }
    
    interface PlayerConstructor {
      new (element: HTMLElement | string, options: PlayerOptions): Player;
    }
    
    interface YT {
      Player: PlayerConstructor;
      PlayerState: typeof PlayerState;
    }
  }
}

export interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  courseId?: number;
  moduleId?: number;
  onComplete?: () => void;
}

export function YouTubePlayer({ 
  videoId, 
  title,
  courseId, 
  moduleId, 
  onComplete
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watchedSegments, setWatchedSegments] = useState<[number, number][]>([]);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [skipAttempts, setSkipAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [playbackLocked, setPlaybackLocked] = useState(false);
  const [completionBlocked, setCompletionBlocked] = useState(false);
  const [expectedTime, setExpectedTime] = useState(0);
  
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const lastValidTimeRef = useRef<number>(0);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { isCompleted, markAsCompleted } = useIsVideoCompleted(videoId);

  // Load YouTube API
  useEffect(() => {
    // Only load the script once
    if (!document.getElementById("youtube-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-api";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    const onYouTubeIframeAPIReady = () => {
      if (containerRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0, // Disable YouTube controls
            modestbranding: 1,
            rel: 0,
            disablekb: 1, // Disable keyboard controls
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      // Use the global callback function that YouTube API expects
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      
      if (timeTrackingIntervalRef.current) {
        clearInterval(timeTrackingIntervalRef.current);
        timeTrackingIntervalRef.current = null;
      }
      
      if (playbackVerificationRef.current) {
        clearInterval(playbackVerificationRef.current);
        playbackVerificationRef.current = null;
      }
      
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
        lockTimeoutRef.current = null;
      }
    };
  }, [videoId]);

  // Handle player ready event
  const onPlayerReady = (event: YT.PlayerEvent) => {
    setDuration(event.target.getDuration());
    setVolume(event.target.getVolume());
    setIsMuted(event.target.isMuted());
  };

  // Handle player state changes
  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
      setIsPlaying(true);
        startTimeTracking();
        startPlaybackVerification();
        setLastValidTimePosition();
        break;
      case window.YT.PlayerState.PAUSED:
      setIsPlaying(false);
        stopTimeTracking();
        stopPlaybackVerification();
        updateWatchedSegments();
        break;
      case window.YT.PlayerState.ENDED:
      setIsPlaying(false);
        stopTimeTracking();
        stopPlaybackVerification();
        updateWatchedSegments();
        checkVideoCompletion();
        break;
      case window.YT.PlayerState.BUFFERING:
        // Skip detection during buffering is handled differently
        setLastValidTimePosition();
        break;
    }
  };

  // Track current time
  const timeTrackingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startTimeTracking = () => {
    if (!timeTrackingIntervalRef.current) {
      timeTrackingIntervalRef.current = setInterval(() => {
        if (playerRef.current) {
          const time = playerRef.current.getCurrentTime();
          setCurrentTime(time);
          setExpectedTime(prev => prev + 0.5);
        }
      }, 500);
    }
  };

  const stopTimeTracking = () => {
    if (timeTrackingIntervalRef.current) {
      clearInterval(timeTrackingIntervalRef.current);
      timeTrackingIntervalRef.current = null;
    }
  };
  
  // Playback verification to detect skips
  const playbackVerificationRef = useRef<NodeJS.Timeout | null>(null);
  
  const startPlaybackVerification = () => {
    if (!playbackVerificationRef.current) {
      playbackVerificationRef.current = setInterval(() => {
        if (playerRef.current && isPlaying) {
          const actualTime = playerRef.current.getCurrentTime();
          const timeDiff = Math.abs(actualTime - expectedTime);
          
          // If actual time is more than 3 seconds different from expected, consider it a skip
          if (timeDiff > 3 && actualTime > expectedTime) {
            handleSkipDetected(actualTime);
          }
        }
      }, 500);
    }
  };
  
  const stopPlaybackVerification = () => {
    if (playbackVerificationRef.current) {
      clearInterval(playbackVerificationRef.current);
      playbackVerificationRef.current = null;
    }
  };
  
  // Save the last valid time position for reverting skips
  const setLastValidTimePosition = () => {
    if (playerRef.current) {
      const currentPosition = playerRef.current.getCurrentTime();
      lastValidTimeRef.current = currentPosition;
      setExpectedTime(currentPosition);
    }
  };
  
  // Handle skip detection
  const handleSkipDetected = (skipToTime: number) => {
    setSkipAttempts(prev => {
      const newCount = prev + 1;
      // Block completion after 3 attempts
      if (newCount >= 3) {
        setCompletionBlocked(true);
      }
      return newCount;
    });
    
    setShowWarning(true);
    
    // Revert to the last valid position
    if (playerRef.current) {
      playerRef.current.seekTo(lastValidTimeRef.current, true);
      
      // Lock playback for 5 seconds as a penalty after the second attempt
      if (skipAttempts >= 1) {
        setPlaybackLocked(true);
        playerRef.current.pauseVideo();
        
        if (lockTimeoutRef.current) {
          clearTimeout(lockTimeoutRef.current);
        }
        
        lockTimeoutRef.current = setTimeout(() => {
          setPlaybackLocked(false);
          setShowWarning(false);
        }, 5000);
      } else {
        // Just a warning for the first attempt
        setTimeout(() => {
          setShowWarning(false);
        }, 3000);
      }
    }
  };

  // Update watched segments
  const updateWatchedSegments = () => {
    if (!playerRef.current) return;
    
    const currentPosition = playerRef.current.getCurrentTime();
    const startPosition = Math.max(0, lastValidTimeRef.current); 
    
    // Add this segment to watched segments only if it's a valid segment (not a skip)
    if (currentPosition > startPosition) {
      setWatchedSegments(prev => {
        const newSegments = [...prev];
        
        // Try to merge with existing segments
        let merged = false;
        for (let i = 0; i < newSegments.length; i++) {
          const [start, end] = newSegments[i];
          
          // If segments overlap, merge them
          if (start <= currentPosition && startPosition <= end) {
            newSegments[i] = [Math.min(start, startPosition), Math.max(end, currentPosition)];
            merged = true;
            break;
          }
        }
        
        // If no merge was possible, add as new segment
        if (!merged) {
          newSegments.push([startPosition, currentPosition]);
        }
        
        return newSegments;
      });
    }
    
    // Update the last valid time
    lastValidTimeRef.current = currentPosition;
  };

  // Check if video is completed
  const checkVideoCompletion = () => {
    if (duration <= 0 || completionBlocked) return;
    
    // Calculate watched percentage
    let watchedTime = 0;
    watchedSegments.forEach(([start, end]) => {
      watchedTime += (end - start);
    });
    
    const watchedPercentage = (watchedTime / duration) * 100;
    
    // If watched more than 85%, consider completed
    if (watchedPercentage >= 85 && !isCompleted) {
      markAsCompleted();
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Handle progress bar clicks
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !playerRef.current || !isPlaying || playbackLocked) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const targetTime = duration * clickPosition;
    
    // Only allow seeking to the parts that have been watched
    let isInWatchedSegment = false;
    for (const [start, end] of watchedSegments) {
      if (targetTime >= start && targetTime <= end) {
        isInWatchedSegment = true;
        break;
      }
    }
    
    // Allow seeking back to any position, but only forward within watched segments
    if (targetTime <= currentTime || isInWatchedSegment) {
      playerRef.current.seekTo(targetTime, true);
      setCurrentTime(targetTime);
      setLastValidTimePosition();
    } else {
      // Detected attempt to skip ahead to unwatched content
      handleSkipDetected(targetTime);
    }
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (!playerRef.current) return;
    
    if (playbackLocked) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (!playerRef.current) return;
    
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current) return;
    
    const newVolume = Number(e.target.value);
    playerRef.current.setVolume(newVolume);
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    }
  };

  // Render progress bar segments
  const renderProgressSegments = () => {
    if (duration <= 0) return null;
    
    return watchedSegments.map(([start, end], index) => {
      const leftPercent = (start / duration) * 100;
      const widthPercent = ((end - start) / duration) * 100;
      
      return (
        <div 
          key={index}
          className="absolute h-full bg-emerald-500" 
          style={{ 
            left: `${leftPercent}%`, 
            width: `${widthPercent}%` 
          }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col">
      <div 
        className="relative border border-gray-200 rounded-md overflow-hidden"
        ref={videoContainerRef}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* YouTube Iframe */}
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          <div ref={containerRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
        
        {/* Warning Overlay */}
        {showWarning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 text-white text-center p-6">
            <AlertTriangle size={48} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Skip Detected!</h3>
            <p className="mb-4">Skipping content will prevent verification.</p>
            <p className="text-sm text-yellow-500">
              {playbackLocked 
                ? `Playback locked for 5 seconds as a penalty.` 
                : `Reverting to last valid position.`
              }
            </p>
            <p className="text-sm text-yellow-500 mt-2">
              Skip attempts: {skipAttempts}/3
              {completionBlocked && " - Verification now blocked"}
            </p>
          </div>
        )}
        
        {/* Custom Controls */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity",
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        )}>
          {/* Progress Bar */}
          <div 
            className="h-2 bg-gray-700 rounded-full mb-4 relative cursor-pointer"
            ref={progressRef}
            onClick={handleProgressBarClick}
          >
            {renderProgressSegments()}
            {/* Current time indicator */}
            <div 
              className="absolute h-full w-1 bg-white rounded-full" 
              style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-emerald-400 transition-colors"
                disabled={playbackLocked}
              >
                {isPlaying ? (
                  <Pause size={24} />
                ) : (
                  <Play size={24} />
                )}
              </button>
              
              {/* Volume Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-emerald-400 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 accent-emerald-500"
                />
              </div>
              
              {/* Time Display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            {/* Verification Status */}
            <div className="flex items-center gap-2">
              {completionBlocked ? (
                <span className="text-red-500 text-sm flex items-center">
                  <AlertTriangle size={16} className="mr-1" /> Verification Blocked
                </span>
              ) : isCompleted ? (
                <span className="text-emerald-500 text-sm flex items-center">
                  <CheckCircle size={16} className="mr-1" /> Verified
                </span>
              ) : (
                <span className="text-white text-sm">
                  Skip attempts: {skipAttempts}/3
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Skip Attempts Warning */}
      {skipAttempts > 0 && (
        <div className={cn(
          "mt-2 px-4 py-2 rounded-md text-sm",
          completionBlocked 
            ? "bg-red-100 text-red-800" 
            : "bg-yellow-100 text-yellow-800"
        )}>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <span className="font-medium">
              {completionBlocked 
                ? "Video verification has been blocked due to too many skip attempts" 
                : `Warning: ${skipAttempts}/3 skip attempts detected`
              }
            </span>
          </div>
          <p className="mt-1 text-xs">
            {completionBlocked 
              ? "You will not receive credit for completing this video."
              : "This video requires watching at least 85% of the content to be marked as complete."
            }
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function to format time in MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
} 