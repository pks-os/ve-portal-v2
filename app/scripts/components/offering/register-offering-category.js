// @ngInject
export default function registerOfferingCategory(features, $q, offeringsService, AppstoreCategoriesService) {
  AppstoreCategoriesService.registerCategory(() => {
    if (!features.isVisible('support')) {
      return $q.when([]);
    }

    return offeringsService.getConfiguration()
      .then(offerings => {
        return Object.keys(offerings).map(key => ({
          key,
          label: offerings[key].label,
          icon: offerings[key].icon || 'fa-gear',
          description: offerings[key].description,
          category: offerings[key].category || gettext('Custom request'),
          state: 'appstore.offering',
        }));
      }).catch(error => {
        if (error.status === 424) {
          return [];
        }
        throw error;
      });
  });
}
