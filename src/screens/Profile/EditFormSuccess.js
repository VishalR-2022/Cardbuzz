import { Success } from "../../components";
import { useNavigation } from "@react-navigation/native";

const EditFormSuccess = () => {
  const navigation = useNavigation();

  return (
    <Success
      text={"Bank Details Updated"}
      onPress={() => navigation.navigate("Root")}
    />
  );
};

export default EditFormSuccess;
