export type LeaderboardPerson = {
  id: string;
  name: string;
  points: number;
  note: string;
};

export const leaderboardPeople: LeaderboardPerson[] = [
  {
    id: "wowo",
    name: "Wowo",
    points: 180,
    note: "Rajin membaca",
  },
  {
    id: "budi",
    name: "Budi",
    points: 145,
    note: "Hebat mencoba",
  },
  {
    id: "yono",
    name: "Yono",
    points: 132,
    note: "Semangat belajar",
  },
  {
    id: "eko",
    name: "Eko",
    points: 130,
    note: "Terus berlatih",
  },
  {
    id: "fajar",
    name: "Fajar",
    points: 95,
    note: "Pelan-pelan bisa",
  },
  {
    id: "gita",
    name: "Gita",
    points: 82,
    note: "Suka belajar",
  },
];
