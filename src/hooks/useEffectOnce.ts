/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from 'react';

export const useEffectOnce = (effect: EffectCallback) => useEffect(effect, []);
