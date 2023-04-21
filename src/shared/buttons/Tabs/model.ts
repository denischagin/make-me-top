interface TabsInterface {
  title: string
  active: boolean
}

export const TABS: Array<TabsInterface> = [
  {
    title: "Планеты",
    active: true,
  },
  {
    title: "Исследователи",
    active: false,
  },
  {
    title: "Хранители",
    active: false,
  },
];