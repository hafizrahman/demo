import { login, signup } from './actions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function LoginPage() {
    return (
        <Container component="main" maxWidth="xs" className="mt-16 md:mt-20">
            <Box
                // Replaced sx props with Tailwind classes for flex layout
                className="flex flex-col items-center"
            >
                {/* Replaced sx prop with Tailwind class for margin bottom (approx theme.spacing(2)) */}
                <h1 className="text-lg font-bold">
                    Sign in / Sign up
                </h1>

                <h3 className="text-sm font-serif italic mb-4 mt-4">Access to this demo site requires a login. Please make a free account to proceed.</h3>

                <Box component="form" className="w-full mt-2">
                    <Stack spacing={2}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Stack direction="row" spacing={2} className="mt-4">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="mt-6 mb-2"
                                formAction={login}
                            >
                                Log In
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                className="mb-4"
                                formAction={signup}
                            >
                                Sign Up
                            </Button>
                        </Stack>

                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}
