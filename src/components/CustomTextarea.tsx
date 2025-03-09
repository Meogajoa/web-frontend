import { type Nullable } from '@/types/misc';
import { cn } from '@/utils/classname';
import React from 'react';

export type TextareaHandle = {
  clear: () => void;
  focus: () => void;
  blur: () => void;
  setValue: (value: string) => void;
  getValue: () => string;
};

type Props = React.ComponentPropsWithoutRef<'textarea'> & {
  ref: React.Ref<Nullable<TextareaHandle>>;
};

const CustomTextarea: React.FC<Props> = ({ className, ref, ...props }) => {
  const hiddenTextarea = React.useRef<HTMLTextAreaElement>(null);
  const textArea = React.useRef<HTMLTextAreaElement>(null);

  React.useLayoutEffect(() => {
    if (!hiddenTextarea.current || !textArea.current) {
      return;
    }

    hiddenTextarea.current.style.width = textArea.current.offsetWidth + 'px';
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  React.useImperativeHandle(ref, () => ({
    clear: () => {
      if (!textArea.current) {
        return;
      }

      textArea.current.value = '';
      adjustHeight();
    },
    focus: () => {
      if (!textArea.current) {
        return;
      }

      textArea.current.focus();
    },
    blur: () => {
      if (!textArea.current) {
        return;
      }

      textArea.current.blur();
    },
    setValue: (value: string) => {
      if (!textArea.current) {
        return;
      }

      textArea.current.value = value;
      adjustHeight();
    },
    getValue: () => {
      if (!textArea.current) {
        return '';
      }

      return textArea.current.value;
    },
  }));

  return (
    <>
      <textarea
        ref={hiddenTextarea}
        rows={1}
        className={cn(
          'invisible absolute box-border -translate-y-10 resize-none p-0',
          className,
        )}
        {...props}
      />

      <textarea
        ref={textArea}
        onChange={adjustHeight}
        rows={1}
        className={cn('box-border w-full resize-none p-0', className)}
        {...props}
      />
    </>
  );

  function adjustHeight() {
    if (!hiddenTextarea.current || !textArea.current) {
      return;
    }

    hiddenTextarea.current.value = textArea.current.value;
    hiddenTextarea.current.style.height = 'auto';
    textArea.current.style.height =
      Math.min(hiddenTextarea.current.scrollHeight, 150) + 'px';
  }
};

export default CustomTextarea;
