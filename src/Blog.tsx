import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import MainContent from './components/MainContent';
import Latest from './components/Latest';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import QuestionAnswer from './components/QuestionAnswer';

export default function Blog(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainContent />
                <Latest />
              </>
            }
          />
          <Route path="/qa/:cardId" element={<QuestionAnswer />} />
        </Routes>
      </Container>

      <Footer />
    </AppTheme>
  );
}
