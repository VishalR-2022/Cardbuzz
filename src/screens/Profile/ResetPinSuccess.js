import { Success } from "../../components";
import { useNavigation } from "@react-navigation/native";

const ResetPinSuccess = () => {
  const navigation = useNavigation();

  return (
    <Success
      text={"PIN Updated Successfully"}
      onPress={() => navigation.navigate("Home")}
    />
  );
};

export default ResetPinSuccess;
