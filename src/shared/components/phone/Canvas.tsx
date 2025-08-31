import type { MotionValue } from "motion";
import { useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { useTheme } from "~context/ThemeContext";

export const Canvas = ({ color, clearCanvas }: { color: string; clearCanvas: MotionValue<boolean> }) => {
	const { textBgColor } = useTheme();
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useMotionValueEvent(clearCanvas, "change", (val) => {
		if (val) {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const context = canvas.getContext("2d");
			if (!context) return;

			context.fillStyle = textBgColor;
			context.fillRect(0, 0, canvas.width, canvas.height);

			clearCanvas.set(false);
		}
	});

	const handleMouseDown = () => setIsDrawing(true);
	const handleMouseUp = () => setIsDrawing(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return;

		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;

		const { offsetX: x, offsetY: y } = e.nativeEvent;

		context.fillStyle = color;
		context.beginPath();
		context.arc(x, y, 3, 0, Math.PI * 2);
		context.fill();
	};

	return (
		<canvas
			ref={canvasRef}
			width={230}
			height={350}
			style={{ border: "1px solid black", cursor: "crosshair", backgroundColor: textBgColor }}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onMouseMove={handleMouseMove}
		/>
	);
};
