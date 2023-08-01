import { toast } from "react-toastify";

export const toastPromise = (
  callback,
  pending = "Wait",
  success = "Success",
  error = "Error"
) => {
  const resolveWithSomeData = new Promise((resolve, reject) => {
    callback
      .then(
        (data) => {
          {
            console.log(data)
            // console.log()
            if (data.meta.requestStatus === "fulfilled") {
              console.log(data)
              resolve(data);
            }else{
                reject(data);
            }
          }
        },
        (data) => new Error("Error Occured" + data)
      ) 
      .catch((error) => {
        console.log("catch called" +error);
        reject(error)
      }); 
  });

    toast.promise(
      resolveWithSomeData,
      {
        pending: {
          render(){
            return pending;
          },
          icon: false,
        },
        success: {
          render({data}){
            return success; 
          },
        },
        error: {
          render({data}){
            return error;
          }
    }
  }
    );
};
