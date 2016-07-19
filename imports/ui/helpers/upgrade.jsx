
export const MaterialJSClass = {
  'mdl-js-layout': 'MaterialLayout',
  'mdl-js-data-table': 'MaterialDataTable',
  'mdl-js-ripple-effect': 'MaterialRipple',
  'mdl-js-button': 'MaterialButton',
  'mdl-js-checkbox': 'MaterialCheckbox',
  'mdl-js-icon-toggle': 'MaterialIconToggle',
  'mdl-js-menu': 'MaterialManu',
  'mdl-js-progress': 'MaterialProgress',
  'mdl-js-radio': 'MaterialRadio',
  'mdl-js-slider': 'MaterialSlider',
  'mdl-js-snackbar': 'MaterialSnackbar',
  'mdl-js-spinner': 'MaterialSpinner',
  'mdl-js-switch': 'MaterialSwitch',
  'mdl-js-tabs': 'MaterialTabs',
  'mdl-js-textfield': 'MaterialTextfield',
  'mdl-tooltip': 'MaterialTooltip',
};

export const upgrade = (classNames, ref) => {
  for (const key of Object.keys(MaterialJSClass)) {
    if (classNames.indexOf(key) >= 0) {
      componentHandler.upgradeElement(ref, MaterialJSClass[key]);
    }
  }
};
