
export const MaterialJSClass = {
  'mdl-js-layout': 'MaterialLayout',
  'mdl-js-data-table': 'MaterialDataTable',
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
  'mdl-js-ripple-effect': 'MaterialRipple',

};

const upgrade = (ref) => {
  for (const key of Object.keys(MaterialJSClass)) {
    if (ref.className.indexOf(key) >= 0) {
      console.log(key);
      componentHandler.upgradeElement(ref, MaterialJSClass[key]);
    }
  }
};

export default upgrade;
