import { useRef } from 'react';
import { MAX_LENGTH } from '@/constants/nastaliq';
import { MetalFrame } from '@/libs/metalFx';
import { IconButton } from './IconButton';
import { CancelIcon } from './icons/CancelIcon';

export function TextField({ value, onChange, theme }) {
  const inputRef = useRef(null);

  const clear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <MetalFrame theme={theme}>
      <div className="field">
        <input
          ref={inputRef}
          className="field__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={MAX_LENGTH}
          dir="rtl"
          lang="fa"
          placeholder="یک کلمه بنویس…"
          aria-label="متن برای نوشتن به نستعلیق"
        />
        <IconButton label="پاک کردن متن" className="field__clear" data-hidden={!value} onClick={clear}>
          <CancelIcon />
        </IconButton>
      </div>
    </MetalFrame>
  );
}
