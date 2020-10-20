const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', name: 'home', component: () => import('pages/Index.vue')
      },
      {
        path: 'invoice', name: 'invoice', component: () => import('pages/Invoice.vue'), meta: {
          requiresAuth: true,
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];


export default routes
