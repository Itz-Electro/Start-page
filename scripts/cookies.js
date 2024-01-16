// This script makes managing cookies easier
// From https://plantpot.works/4418

const setCookie = (name, json)=>{
    let cookieValue = '';
    let expire = '';
    let period = '';
    //Specify the cookie name and value
    cookieValue = name + '=' + JSON.stringify(json) + ';';
    //Specify the path to set the cookie
    cookieValue += 'path=/ ;';
    //Specify how long you want to keep cookie
    period = 9999; //days to store
    expire = new Date();
    expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
    expire.toUTCString();
    cookieValue += 'expires=' + expire + ';';
  
    //Set cookie
    document.cookie = cookieValue;
  };

  const getCookie = ()=>{
    let cookieValue = '';
    let cookieArray = new Array();
    let result = new Array();
    //Get cookie
    cookieValue = document.cookie;
    console.log(cookieValue)
    //Divide the cookie into an array and convert them to JSON
    if(cookieValue){
      cookieArray = cookieValue.split(';');
      cookieArray.forEach(data => {
        data = data.split('=');
        //data[0]: Cookie name
        //data[1]: Cookie value
        result[data[0]] = data[1];
      });
    }
    if (result.bookmarks == undefined) {
      result.bookmarks == []
      setCookie("bookmarks", [])
    }
    console.log(result.bookmarks)

    
    return JSON.parse(`{"bookmarks":${JSON.parse(result.bookmarks)}}`).bookmarks;
  }

export { setCookie, getCookie }