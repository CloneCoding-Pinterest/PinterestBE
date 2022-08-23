const { SuccessFormDto, FailureFormDto } = require('../../models/_.models.loader');

class FormProvider {
    constructor() {}

    /**
     * @param { string } message
     * @param { object } result
     */
    getSuccessFormDto(message, result = {}) {
        return new SuccessFormDto(message, result);
    }

    /**
     * @param { string } message
     * @param { object } result
     */
    getFailureFormDto(message, result = {}) {
        return new FailureFormDto(message, result);
    }
}

module.exports = FormProvider;
