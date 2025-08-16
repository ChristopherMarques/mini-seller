import { Button } from "@/components/ui/button";
import { useTutorial } from "@/hooks/use-tutorial";
import { Info } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

interface TutorialProps {
  runTour?: boolean;
  onTourEnd?: () => void;
}

export const Tutorial = ({ runTour = false, onTourEnd }: TutorialProps) => {
  const { t } = useTranslation();
  const { runTour: autoRunTour, completeTutorial } = useTutorial();
  const [run, setRun] = useState(runTour || autoRunTour);

  useEffect(() => {
    setRun(runTour || autoRunTour);
  }, [runTour, autoRunTour]);

  const getAvailableSteps = (): Step[] => {
    const allSteps: Step[] = [
      {
        target: "body",
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("tutorial.welcome.title")}</h3>
            <p>{t("tutorial.welcome.content")}</p>
          </div>
        ),
        placement: "center",
      },
      {
        target: '[data-tutorial="controls"]',
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("tutorial.controls.title")}</h3>
            <p>{t("tutorial.controls.content")}</p>
          </div>
        ),
        placement: "bottom",
      },
      {
        target: '[data-tutorial="opportunities"]',
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("tutorial.opportunities.title")}</h3>
            <p>{t("tutorial.opportunities.content")}</p>
          </div>
        ),
        placement: "bottom",
      },
    ];

    // Adiciona passo de importação apenas se o elemento existir
    if (document.querySelector('[data-tutorial="import"]')) {
      allSteps.push({
        target: '[data-tutorial="import"]',
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("tutorial.import.title")}</h3>
            <p>{t("tutorial.import.content")}</p>
          </div>
        ),
        placement: "bottom",
      });
    }

    // Adiciona passo de exportação apenas se o elemento existir
    if (document.querySelector('[data-tutorial="export"]')) {
      allSteps.push({
        target: '[data-tutorial="export"]',
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("tutorial.export.title")}</h3>
            <p>{t("tutorial.export.content")}</p>
          </div>
        ),
        placement: "bottom",
      });
    }

    allSteps.push({
      target: '[data-tutorial="leads"]',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-2">{t("tutorial.leads.title")}</h3>
          <p>{t("tutorial.leads.content")}</p>
        </div>
      ),
      placement: "top",
    });

    return allSteps;
  };

  const steps = getAvailableSteps();

  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { status } = data;

      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        setRun(false);
        completeTutorial();
        onTourEnd?.();
      }
    },
    [onTourEnd, completeTutorial],
  );

  const startTour = () => {
    setRun(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={startTour}
        title={t("tutorial.help_button")}
        className="h-9 w-9 text-primary hover:text-primary"
      >
        <Info className="h-24 w-24" />
      </Button>

      <Joyride
        steps={steps}
        run={run}
        callback={handleJoyrideCallback}
        continuous
        showSkipButton
        scrollToFirstStep
        hideCloseButton
        disableOverlayClose
        locale={{
          back: t("tutorial.buttons.back"),
          close: t("tutorial.buttons.close"),
          last: t("tutorial.buttons.close"),
          next: t("tutorial.buttons.next"),
          skip: t("tutorial.buttons.skip"),
        }}
        styles={{
          options: {
            primaryColor: "var(--primary)",
            textColor: "var(--foreground)",
            backgroundColor: "var(--background)",
            overlayColor: "rgba(0, 0, 0, 0.8)",
            arrowColor: "var(--background)",
            zIndex: 1000,
          },
          tooltip: {
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid var(--border)",
          },
          tooltipContent: {
            padding: "16px",
          },
          buttonNext: {
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            padding: "8px 16px",
            fontSize: "14px",
          },
          buttonBack: {
            color: "var(--muted-foreground)",
            marginRight: "8px",
          },
          buttonSkip: {
            color: "var(--muted-foreground)",
          },
        }}
      />
    </>
  );
};
