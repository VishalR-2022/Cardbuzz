import { Success } from "../../components";
import { useNavigation } from "@react-navigation/native";

const EditFormSuccess = () => {
  const navigation = useNavigation();

  return (
    <Success
      text={"Changes\nSaved"}
      onPress={() => navigation.navigate("Profile")}
    />
  );
};

export default EditFormSuccess;
