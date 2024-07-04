import { StatusBar } from "expo-status-bar";

import { useState, useRef } from "react";

import { captureRef } from "react-native-view-shot";

import * as MediaLibrary from "expo-media-library";

import { StyleSheet, View, Platform } from "react-native";
import Button from "./components/Button";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";

import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from "expo-image-picker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const imageRef = useRef();

	const onSaveImageAsync = async () => {
		if (Platform.OS !== "web") {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				});

				await MediaLibrary.saveToLibraryAsync(localUri);
				if (localUri) {
					alert("Saved!");
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				const dataUrl = await domtoimage.toJpeg(imageRef.current, {
					quality: 0.95,
					width: 320,
					height: 440,
				});

				let link = document.createElement("a");
				link.download = "sticker-smash.jpeg";
				link.href = dataUrl;
				link.click();
			} catch (e) {
				console.log(e);
			}
		}
	};
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [status, requestPermission] = MediaLibrary.usePermissions();

	const [pickedEmoji, setPickedEmoji] = useState(null);

	const [showAppOptions, setShowAppOptions] = useState(false);
	const onReset = () => {
		setShowAppOptions(false);
	};
	const onAddSticker = () => {
		setIsModalVisible(true);
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};

	if (status === null) {
		requestPermission();
	}
	const pickImageAsync = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);

			console.log(result);
		} else {
			alert("You did not select any image.");
		}
	};
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<View ref={imageRef} collapsable={false}>
						<ImageViewer
							placeholderImageSource={PlaceholderImage}
							selectedImage={selectedImage}
						/>
						{pickedEmoji && (
							<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
						)}
					</View>
				</View>

				{showAppOptions ? (
					<View style={styles.optionsContainer}>
						<View style={styles.optionsRow}>
							<IconButton icon="refresh" label="Reset" onPress={onReset} />
							<CircleButton onPress={onAddSticker} />
							<IconButton
								icon="save-alt"
								label="Save"
								onPress={onSaveImageAsync}
							/>
						</View>
					</View>
				) : (
					<View style={styles.footerContainer}>
						<Button
							label="Use this photo"
							onPress={() => setShowAppOptions(true)}
						/>

						<Button
							theme="primary"
							onPress={pickImageAsync}
							label="Choose a photo"
						/>
					</View>
				)}
				<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
					<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
				</EmojiPicker>
				<StatusBar style="light" />
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		alignItems: "center",
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: "center",
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},
	optionsContainer: {
		position: "absolute",
		bottom: 80,
	},
	optionsRow: {
		alignItems: "center",
		flexDirection: "row",
	},
});
