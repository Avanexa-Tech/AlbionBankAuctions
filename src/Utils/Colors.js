import { Dimensions } from "react-native";
export const window_width = Dimensions.get('window').width;
export const window_height = Dimensions.get('window').height;
export const snackDuration = 3000;

export const green_line = "#17a589";
export const headertextcolor = '#0a3f69';
export const comp_textcolor = 'white'

export const primarycolor = '#8C193F';
export const textcolor = '#fff';
export const focused_inputcolor = '#3e3e3e';
export const btn_textcolor = 'black';
export const sub_textcolor = '#8b8b8b';
export const loader_bgcolor = '#fff';

export const Color = {
  STATUSBAR_COLOR: 'black',
  HEADER_COLOR: 'black',
  CARD_BG_COLOR: '#ffffff',
  HEADER_TEXT_COLOR: '#ffffff',
  HEADER_BACK_ICON_COLOR: '#ffffff',
  BLACK: 'black',
};

export const authscreen_container= {      
  width: '100%',
  backgroundColor: primarycolor,
  justifyContent: 'center',
  alignItems: 'center'
}
export const authscreen_overlay= {      
  width: '80%',      
  minWidth: 250,
  maxWidth: 500,
  backgroundColor: primarycolor,
}
export const authscreen_title= {      
  fontSize: 33,
  paddingVertical: 10,
  color: 'white',
  fontWeight: 'bold',
  marginTop: 10
}

export const authscreen_subtitle= {
  fontSize: 14,
  color: sub_textcolor,
  fontWeight: 'bold',
  lineHeight: 20,
  marginVertical: 10
}




export const textInputColors = {
    textcolor: 'white',
    backgroundcolor: 'black',
    placeholdercolor: '#fff',
    iconcolors: '#fff'
  };

export const helperTextViewstyle = {
   height:35
}
export const helperTextstyle = {
   //alignSelf: 'flex-end',
    fontSize: 12,
    color: '#FF5050',
    fontWeight:'600'
}

export const text_inputsthemes = {
    primary:'white',
    text:'white',
    placeholder: 'white',
    placeholdercolor:'white'
};

export const text_inputstyle = {
    height: 40,  
    width:'100%', 
    fontSize:15,   
    color:'white'   ,
    // backgroundColor:'#f3f3f3'
  };

export const textinput_parrentstyle = {
  paddingHorizontal: 10,  
  
}
export const placeholder_textstyle = {
  color: 'white', fontSize: 12, paddingTop:5
}

export const pending_Color = '#8B8B8B';
export const inProgress_Color = '#0066FF';
export const completed_Color = '#2AB673';

export const percent_0_Color = pending_Color;
export const percent_25_Color = '#EBC300';
export const percent_50_Color = '#FF6600';
export const percent_75_Color = inProgress_Color;
export const percent_100_Color = completed_Color;

export const statusColors=(status)=>{
    try {     
        switch (status) {
          case 'pending':
            return pending_Color         
          case 'inprogress':
            return inProgress_Color           
          case 'completed':
            return completed_Color                
          default:
            break;
        }
    } catch (error) {
      
    }
}
export const percentageColors=(percent)=>{
    try {     
        switch (percent) {
          case 0:
            return percent_0_Color           
          case 25:
            return percent_25_Color          
          case 50:
            return percent_50_Color               
          case 75:
            return percent_75_Color            
          case 100:
            return percent_100_Color             
          default:
            break;
        }
    } catch (error) {
      console.log("catch in percentageColors in colors page : ", error)
    }
}

export const status_Compare=(percent)=>{
  try {
      switch (percent) {
          case 0:
              return 'pending'

          case 25:
              return 'inprogress'

          case 50:
              return 'inprogress'

          case 75:
              return 'inprogress'

          case 100:
              return 'completed'

          default:
              break;
      }
  } catch (error) {
      console.log("catch in action details status compare in colors page ", error);
  }

}
export const status_Compare_id=(percent)=>{

  try {
      switch (percent) {
          case 0:
              return 1

          case 25:
              return 2

          case 50:
              return 2

          case 75:
              return 2

          case 100:
              return 3

          default:
              break;
      }
  } catch (error) {
      console.log("catch in action details status compare id ", error);
  }
}

export function daysDifference(start,end) {
  try {              
      const date1 = new Date(start);
      const date2 = new Date(end);               
      const days = Math.abs(date2 - date1);    
      let rounded_days = days / (1000 * 60 * 60 * 24)
      return Math.round(rounded_days);
  } catch (error) {
      console.log("catch in days _difference in colors page ",error);
  }
}

