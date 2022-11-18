import React from "react";
import RCNotification from "rc-notification";
import {
  NotificationInstance,
  NoticeContent,
} from "rc-notification/lib/Notification";
import * as S from "./styles.Toast";

// config options
export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  maxCount?: number;
}

let notificationInstance: NotificationInstance | null = null;

let key = 1;
let maxCount = 10;
let defaultDuration = 3;
let defaultTop: number;
// let localPrefixCls = "";
let getContainer: () => HTMLElement;

export interface ArgsProps {
  content: React.ReactNode;
  duration?: number;
  type: NotificationType;
  prefixCls?: string;
  rootPrefixCls?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

function setMessageConfig(options: ConfigOptions) {
  if (options.top !== undefined) {
    defaultTop = options.top;
    notificationInstance = null; // delete messageInstance for new defaultTop
  }
  if (options.duration !== undefined) {
    defaultDuration = options.duration;
  }

  if (options.getContainer !== undefined) {
    getContainer = options.getContainer;
  }

  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
    notificationInstance = null;
  }
}

function destroy(messageKey?: React.Key) {
  if (notificationInstance) {
    if (messageKey) {
      const { removeNotice } = notificationInstance;
      removeNotice(messageKey);
    } else {
      const { destroy } = notificationInstance;
      destroy();
      notificationInstance = null;
    }
  }
}

function getRCNoticeProps(args: ArgsProps): NoticeContent {
  const duration =
    args.duration !== undefined ? args.duration : defaultDuration;
  const Icon = typeToIcon[args.type];
  return {
    key: args.key,
    duration,
    style: args.style || {},
    className: args.className,
    content: (
      <S.ContentWrapper className="sui-content" $type={args.type}>
        {Icon}
        <div>{args.content}</div>
      </S.ContentWrapper>
    ),
  };
}

function getRCNotificationInstance(
  args: ArgsProps,
  callback: (info: { instance: NotificationInstance }) => void
) {
  const { getPopupContainer: getContextPopupContainer } = args;

  if (notificationInstance) {
    callback({
      instance: notificationInstance,
    });
    return;
  }
  const instanceConfig = {
    prefixCls: "sui",
    style: { top: defaultTop }, // 覆盖原来的样式
    getContainer: getContainer || getContextPopupContainer,
    maxCount,
  };

  RCNotification.newInstance(instanceConfig, (instance: any) => {
    if (notificationInstance) {
      callback({ instance: notificationInstance });
      return;
    }
    notificationInstance = instance;

    if (process.env.NODE_ENV === "test") {
      (notificationInstance as any).config = instanceConfig;
    }

    callback({ instance });
  });
}

function notice(args: ArgsProps) {
  const target = args.key || getKeyThenIncreaseKey();
  getRCNotificationInstance(args, ({ instance }) => {
    instance.notice(getRCNoticeProps({ ...args, key: target }));
  });
}

function getKeyThenIncreaseKey() {
  return key++;
}

const typeToIcon = {
  success: <S.SuccessIcon />,
  error: <S.ErrorIcon />,
  warn: <S.IconWarn />,
  info: <S.IconInfo />,
};

const Toast = {
  success: (args: Omit<ArgsProps, "type">) =>
    notice({ type: "success", ...args }),
  error: (args: Omit<ArgsProps, "type">) => notice({ type: "error", ...args }),
  warn: (args: Omit<ArgsProps, "type">) => notice({ type: "warn", ...args }),
  info: (args: Omit<ArgsProps, "type">) => notice({ type: "info", ...args }),
  config: setMessageConfig,
  destroy: destroy,
};

export default Toast;
