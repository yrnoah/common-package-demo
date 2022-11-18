import { RawIntlProvider, createIntl } from "react-intl";
import { ToastGlobalStyle } from "../src/styles/toastGlobalStyle";
import { BrowserRouter as Router } from "react-router-dom";
import {
  SuiDialogueProvider,
  SuiDialogueLayer,
} from "../src/components/Siblings/Dialogue/useDialogue";

export const parameters = {
  // Avoid repeated event calls that cause page blocking,
  // temporarily configure acitons to allow display of onCLick,onMounse, onLoad, onSubmit...etc
  // ^on[A-Z].*
  actions: {
    argTypesRegex: "^on[C|L|S].*|onMouseEnter|onMouseLeave|onMouseOver",
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// mock intl provider
const intlCache = createIntl({
  locale: "en-US",
  onError: () => {
    /** disable error */ return null;
  },
});
export const decorators = [
  (Story) => (
    <>
      <ToastGlobalStyle />
      <Story />
      <SuiDialogueLayer />
    </>
  ),
  (Story) => (
    <SuiDialogueProvider>
      <Story />
    </SuiDialogueProvider>
  ),
  (Story) => (
    <RawIntlProvider value={intlCache}>
      <Story />
    </RawIntlProvider>
  ),
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
