const InputJS  = () => {

        let materialInputs = document.querySelectorAll('input.input-material');
        let materialLabel = document.querySelectorAll('label.label-material');

        // activate labels for prefilled values
        let filledMaterialInputs = Array.from(materialInputs).filter(function (input) {
            return input.value !== '';
        });
        
        filledMaterialInputs.forEach(input => input.parentElement.lastChild.previousSibling.setAttribute('class', 'label-material active'));

        // move label on focus
        materialInputs.forEach((input) => {
            input.addEventListener('focus', function () {
                input.parentElement.lastChild.previousSibling.setAttribute('class', 'label-material active');
            });
        });

        // remove/keep label on blur
        materialInputs.forEach((input) => {
            input.addEventListener('blur', function () {
                if (input.value !== '') {
                    input.parentElement.lastChild.previousSibling.setAttribute('class', 'label-material active');
                } else {
                    input.parentElement.lastChild.previousSibling.setAttribute('class', 'label-material');
                }
            });
        });
    }

export {InputJS};