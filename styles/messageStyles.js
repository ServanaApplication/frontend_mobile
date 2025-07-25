import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerText: {
    color: "#6A1B9A",
    fontSize: 20,
    marginLeft: 8,
  },
  endChatText: {
    color: "red",
    fontSize: 16,
  },
  promptText: {
    color: "#000",
    fontSize: 16,
    marginBottom: 12,
  },
  optionButton: {
    borderColor: "#6A1B9A",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    alignSelf: "flex-start",
  },
  optionText: {
    color: "#000",
    fontSize: 16,
  },
  selectedBubble: {
    backgroundColor: "#6A1B9A",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    maxWidth: "70%",
    marginVertical: 8,
  },
  selectedBubbleText: {
    color: "#fff",
    fontSize: 16,
  },
  timeText: {
    color: "#ddd",
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
});
