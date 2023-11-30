import { Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const InnerHeader = ({ title, text = [] }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background:
          theme.palette.mode === "dark"
            ? theme.palette.common.black
            : theme.palette.secondary.light,
        paddingY: 1,
        paddingX: 2,
        borderRadius: 1.5,
        height: "40px",
      }}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box>
        <Typography variant="h4" color={theme.palette.common.white}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <HomeIcon sx={{ color: theme.palette.secondary.dark }} />
          </Grid>
          {text.map((data, index) => (
            <>
              <Grid item>
                <ArrowForwardIosIcon fontSize="sm" />
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  color={theme.palette.common.white}
                  onClick={() => navigate(data.url)}
                  style={{ cursor: "pointer" }}
                >
                  {data.value}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default InnerHeader;
