/**
 * 
 * A handler function used to handle all the
 * calls made to native code. The purpose is
 * to make sure that the storage is initialized
 * before any storage requests are sent to the
 * MMKV instance. 
 * 
 * 
 * @param {boolean} initialized Tells the function if the storage has been loaded
 * @param {*} options The options you used to initialize the loader class
 * @param {*} action The native function that will be called
 * @param {*} callback The callback function for the native function
 * @param  {...any} args Arguments for the native function
 */

import { currentInstancesStatus } from "./initializer";

export function handleAction(action, callback, ...args) {
  if (currentInstancesStatus[this.instanceID]) {
   return action(...args, callback);
  
  } else {
    initialize(this.options, (err, result) => {
      if (err) {
        currentInstancesStatus[this.instanceID] = false
       return callback(err, null);
       
      }
      currentInstancesStatus[this.instanceID] = true;
     return action(...args, callback);
    
    });
  }
}


export async function handleActionAsync(action,...args) {

  if (currentInstancesStatus[this.instanceID]) {
    return await action(...args);
   
   } else {
     initialize(this.options, (err, result) => {
       if (err) {
        currentInstancesStatus[this.instanceID] = false
        return await action(...args);
        
       }
       currentInstancesStatus[this.instanceID] = true;
      return await action(...args);
     
     });
   }


}