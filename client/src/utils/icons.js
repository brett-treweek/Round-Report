export default function icons(props) {
    // console.log(props);
  switch (props.hazardType) {
    case "Aggresive Dog":
        console.log('woof');
      return "./icons/dog.png";
      
    case "Aggressive Human":
        return "./icons/mad.png";
    
    case "Aggressive Magpie":
        return "./icons/bird.png";
    
    case "Blind Driveway":
        return "./icons/car.png";

    case "Slippery Surface":
        return "./icons/slip.png";
 
    case "School":
        return "./icons/school.png";

    case "Intersection":
        return "./icons/intersection.png";

    case "Roadworks":
        return "./icons/roadworks.png";

    case "Missing Letterbox":
        return "./icons/letterbox.png";

    default:
        return "./icons/warning.png";
      
  }
}
