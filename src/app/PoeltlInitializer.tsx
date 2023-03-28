'use client';

import { useRef } from 'react';

import { deleteCookie } from 'cookies-next';

import { usePoeltlStore } from '@stores';
import { Player, PlayerMapRecord, TeamMapRecord } from '@types';

type Props = {
  chosenPlayerId: number;
  playerParseMap: [number, PlayerMapRecord][];
  teamParseMap: [number, TeamMapRecord][];
  playerGuesses: Player[];
  previousHistoryParseMap: [string, number][];
  errorValidatingToken: boolean;
};

export const PoeltlInitializer = ({ chosenPlayerId, playerParseMap, teamParseMap, playerGuesses, previousHistoryParseMap, errorValidatingToken }: Props) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    if (errorValidatingToken) deleteCookie('token');

    initialized.current = true;

    const playerMap = new Map(playerParseMap);
    const teamMap = new Map(teamParseMap);
    const previousHistory = new Map(previousHistoryParseMap);

    usePoeltlStore.setState((state) => ({ ...state, playerMap, teamMap, chosenPlayerId, playerGuesses, history: previousHistory }));
  }

  return null;
};
