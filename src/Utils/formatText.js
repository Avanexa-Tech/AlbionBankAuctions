export const formatText = (str) => {
    if(!str) return;
    let splittedString = str.split('_')
    if(splittedString.length > 1){
        return splittedString[0].charAt(0).toUpperCase() + splittedString[0].slice(1) + " " + splittedString[1].charAt(0).toUpperCase() + splittedString[1].slice(1)
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}