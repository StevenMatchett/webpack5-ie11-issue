import '@testing-library/cypress/add-commands';
import 'cypress-wait-until';

// Import commands.js
import './commands';

// Change the default testid from data-testId to data-testid
import { configure } from '@testing-library/cypress';
configure({ testIdAttribute: 'data-testid' });
