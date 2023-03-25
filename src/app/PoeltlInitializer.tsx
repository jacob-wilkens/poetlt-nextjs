'use client';

import { useRef } from 'react';

import { usePoeltlStore } from '@stores';
import { PlayerMapRecord, TeamMapRecord } from '@types';

type Props = {
  chosenPlayerId: number;
  playerParseMap: [number, PlayerMapRecord][];
  teamParseMap: [number, TeamMapRecord][];
};

export const PoeltlInitializer = ({ chosenPlayerId, playerParseMap, teamParseMap }: Props) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    initialized.current = true;

    const playerMap = new Map(playerParseMap);
    const teamMap = new Map(teamParseMap);

    usePoeltlStore.setState((state) => ({ ...state, playerMap, teamMap, chosenPlayerId }));
  }

  return null;
};
