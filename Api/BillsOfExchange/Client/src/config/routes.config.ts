import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Route = Readonly<{
  path: string;
  icon?: IconProp;
  exact?: boolean;
  displayName: string;
  showInNav?: boolean;
  pathAbsolute?: string;
}>;

export const RoutesConfig = Object.freeze<Record<string, Route>>({
      Bills: {
        showInNav: true,
        path: '/bills',
        displayName: 'Bills',
        pathAbsolute: '/bills/:page?',
      },
      FetchData: {
        showInNav: true,
        path: '/fetchdata',
        displayName: 'Parties',
        pathAbsolute: '/fetchdata/:page?',
    },
    PartyDetail: {
        showInNav: false,
        path: '/partydetail',
        displayName: 'Party Detail',
        pathAbsolute: '/partydetail/:id',
    },
    BillDetail: {
        showInNav: false,
        path: '/billdetail',
        displayName: 'Bill Detail',
        pathAbsolute: '/billdetail/:id',
    },
});
