function numberValidator(number) {
  const ZERO = 0;
  const messages = {
    callWithoutParams: 'Loading ... Number validator initialized successfully',
    isInvalidType: 'the inserted value must be a "number".',
    positiveNumber: 'positive number',
    negativeNumber: 'negative number',
    neutralNumber: 'neutral number',
  };

  switch (true) {
    case number === undefined:
      return messages.callWithoutParams;
    case typeof number !== 'number':
      return messages.isInvalidType;
    case number > ZERO:
      return messages.positiveNumber;
    case number < ZERO:
      return messages.negativeNumber;
    case number === ZERO:
      return messages.neutralNumber;
    default:
      break;
  }
}

module.exports = numberValidator;
