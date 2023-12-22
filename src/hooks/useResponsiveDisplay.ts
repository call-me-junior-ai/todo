import { useMediaQuery } from "@mui/material";

const useResponsiveDisplay = (): boolean => {
    const isMobile = useMediaQuery('(max-width:600px)');
    return isMobile;
};

export { useResponsiveDisplay };

