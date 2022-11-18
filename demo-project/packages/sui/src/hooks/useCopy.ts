import { useCallback } from "react";
import { useIntl } from "react-intl";
import Toast from "../components/Toast";

function useCopyToClip() {
  const intl = useIntl();
  const handleCopyToClip = useCallback(
    async (text: string) => {
      const exec = () => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        textArea.remove();
        Toast.success({
          content: intl.formatMessage({ defaultMessage: "Copied" }),
        });
      };
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(text);
          Toast.success({
            content: intl.formatMessage({ defaultMessage: "Copied" }),
          });
        } catch (e) {
          exec();
        }
        return;
      }
      exec();
    },
    [intl]
  );
  return {
    onCopyToClip: handleCopyToClip,
  };
}

export default useCopyToClip;
