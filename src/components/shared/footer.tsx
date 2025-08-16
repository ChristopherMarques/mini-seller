import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <span>{t("footer.made_with_love")}</span>
          <Heart className="mx-2 h-4 w-4 text-primary fill-primary" />
          <span>
            {t("footer.in_brazil")}{" "}
            <a
              href="https://www.linkedin.com/in/christopher-marques-correa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t("footer.by_author")}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
