import { defaults, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';

function errorRequest() {
     defaults.styling = 'material';
     defaults.icons = 'material';
     defaults.width = '300px';
     return error({
       text:
         'Unfortunately, your search returned no results! Please enter a more correct request!',
     });
}

export default errorRequest;