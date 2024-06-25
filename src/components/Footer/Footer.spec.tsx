import { render, screen } from "@testing-library/react";
import { Footer } from ".";

describe("Footer component", () => {
    it("should render footer text correctly", () => {
        render(<Footer />);
        
        expect(screen.getByText(/Double-click to edit a todo/i)).toBeDefined();
        
        expect(screen.getByText(/Created by LuizHLG/i)).toBeDefined();
        
        expect(screen.getByText(/YouTube Channel:/i)).toBeDefined();
    });

    it("should render YouTube link correctly", () => {
        render(<Footer />);
        
        // Verifica se o link do YouTube está presente e se a URL está correta
        const linkElement = screen.getByRole("link", { name: /MagoDev/i });
        expect(linkElement).toBeDefined();
        expect(linkElement).toHaveAttribute("href", "https://www.youtube.com/channel/UC0pOPYzBzw2GM9TVd4AlYrA");
        expect(linkElement).toHaveAttribute("target", "_blank");
    });
});