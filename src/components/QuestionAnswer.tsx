import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

const sampleQuestions = [
  {
    id: 'q1',
    text: 'Which option best describes your favourite development workflow?',
    options: ['Pair programming', 'Solo work', 'Code reviews', 'CI/CD driven'],
  },
  {
    id: 'q2',
    text: 'Which area would you like to improve skill-wise?',
    options: ['Testing', 'Performance', 'UX design', 'DevOps'],
  },
  {
    id: 'q3',
    text: 'How often do you ship to production?',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
  },
];

export default function QuestionAnswer() {
  const navigate = useNavigate();
  const params = useParams();
  const cardId = params.cardId;

  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>(() =>
    Array(sampleQuestions.length).fill(''),
  );

  const question = sampleQuestions[index];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = [...answers];
    next[index] = (event.target as HTMLInputElement).value;
    setAnswers(next);
  };

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const nextQ = () => setIndex((i) => Math.min(sampleQuestions.length - 1, i + 1));

  return (
    <Box sx={{ p: { xs: 2, md: 6 } }}>
      <Typography variant="h5" gutterBottom>
        Questionnaire {cardId ? `(from card ${cardId})` : ''}
      </Typography>
      <Typography sx={{ mb: 2 }}>{question.text}</Typography>

      <RadioGroup value={answers[index] || ''} onChange={handleChange}>
        {question.options.map((opt) => (
          <FormControlLabel
            key={opt}
            value={opt}
            control={<Radio />}
            label={opt}
          />
        ))}
      </RadioGroup>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={() => navigate('/') }>
          Back
        </Button>
        <Button disabled={index === 0} onClick={prev}>
          Previous
        </Button>
        <Button onClick={nextQ} disabled={index === sampleQuestions.length - 1}>
          Next
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // lightweight submit placeholder
            // in real app we'd send `answers` plus cardId to a service
            // For now, navigate home after showing console
            console.info('Answers submitted', { cardId, answers });
            navigate('/');
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
