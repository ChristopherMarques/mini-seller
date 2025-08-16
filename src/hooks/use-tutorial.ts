import { useState, useEffect } from 'react';

const TUTORIAL_STORAGE_KEY = 'mini-seller-tutorial-completed';

export function useTutorial() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    
    if (!hasCompletedTutorial) {
      setIsFirstVisit(true);
      // Start tutorial after a short delay to ensure all components are mounted
      const timer = setTimeout(() => {
        setRunTour(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTutorial = () => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    setIsFirstVisit(false);
    setRunTour(false);
  };

  const startTutorial = () => {
    setRunTour(true);
  };

  const stopTutorial = () => {
    setRunTour(false);
  };

  return {
    isFirstVisit,
    runTour,
    startTutorial,
    stopTutorial,
    completeTutorial,
  };
}