import { createContext, ProviderProps, useState } from "react";
import { useEffect } from "react";
import Match from "../types/Match";

interface IMatchesContext {
	matches: Match[];
	addMatch: (match: Match) => void;
	updateMatch: (newMatch: Match) => void;
	deleteMatch: (id: string) => void;
}

export const MatchesContext = createContext<IMatchesContext>({
	matches: [],
	addMatch: () => {},
	updateMatch: () => {},
	deleteMatch: () => {},
});

export const MatchesProvider = (props: React.HTMLAttributes<ProviderProps<IMatchesContext>>) => {
	const [matches, setMatches] = useState<Match[]>([]);

	const updateSavedMatches = (matches: Match[]) => {
		localStorage.setItem("matches", JSON.stringify(matches));
	};

	const getSavedMatches = () => {
		const localMatches = localStorage.getItem("matches");
		if (!localMatches) return [];
		const parsed = JSON.parse(localMatches);
		const matches = parsed
			.map((match: Match) => ({ ...match, date: new Date(match.date) }))
			.sort((a: Match, b: Match) => b.date.getTime() - a.date.getTime());
		return matches;
	};

	const addMatch = (match: Match) => {
		setMatches((m) => {
			const newMatches = [...m, match];
			updateSavedMatches(newMatches);
			return newMatches;
		});
	};

	const updateMatch = (newMatch: Match) => {
		if (!matches.find((m) => m.id === newMatch.id)) return;
		const newMatches = matches.map((match) => {
			if (match.id === newMatch.id) return newMatch;
			return match;
		});
		setMatches(newMatches);
		updateSavedMatches(newMatches);
	};

	const deleteMatch = (id: string) => {
		const newMatches = matches.filter((m) => m.id !== id);
		setMatches(newMatches);
		updateSavedMatches(newMatches);
	};

	useEffect(() => {
		const local = getSavedMatches();
		setMatches(local);
	}, []);

	return <MatchesContext.Provider value={{ matches, addMatch, updateMatch, deleteMatch }} {...props} />;
};
