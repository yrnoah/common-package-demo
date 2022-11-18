import { forwardRef } from "react";
import * as S from "./styles.dialogue";
import Button from "../../Buttons/Button";
import PrimaryButton from "../../Buttons/PrimaryButton";
import type { ISuiDialogueProps } from "./typing";
import { Modal } from "../Modal/Modal";

export const Dialogue = forwardRef<HTMLDivElement, ISuiDialogueProps>(
  (
    {
      title,
      subTitle,
      okText,
      okLoading,
      cancelText,
      handleCancel,
      handleOk,
      style,
      modalWrapperStyle,
      ...modalProps
    },
    ref
  ) => {
    return (
      <Modal {...modalProps} style={modalWrapperStyle}>
        <S.Wrapper ref={ref} style={style}>
          {/* title */}
          {!!title && typeof title === "string" && <S.Title>{title}</S.Title>}
          {!!title && typeof title !== "string" && title}
          {/* subtitle */}
          {!!subTitle && typeof subTitle === "string" && (
            <S.SubTitle>{subTitle}</S.SubTitle>
          )}
          {!!subTitle && typeof subTitle !== "string" && (
            <S.SubTitle>{subTitle}</S.SubTitle>
          )}
          {/* actions */}
          <S.BottomBtnWrapper>
            {!!cancelText && (
              <Button
                style={!!okText ? { marginRight: 12 } : undefined}
                onClick={handleCancel}
              >
                {cancelText}
              </Button>
            )}
            {!!okText && (
              <PrimaryButton onClick={handleOk} loading={okLoading}>
                {okText}
              </PrimaryButton>
            )}
          </S.BottomBtnWrapper>
        </S.Wrapper>
      </Modal>
    );
  }
);

export default Dialogue;
