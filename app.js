(function() {
    const playgroundDiv = document.getElementById("playground");

    function createForm() {
        const form = document.createElement("form");

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const dataType = form.elements["dataType"].value;
            const lang = form.elements["lang"].value;

            if (!dataType) {
                alert("Please select data type!");
                return;
            }
            
            fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=${dataType}&lang=${!!lang ? lang : "en"}`)
            .then(response => response.json())
            .then(response => {
                alert(JSON.stringify(response));
            })
            .catch(console.error);
        });
        
        form.appendChild(
            createFormGroup(function() {
                const selectDataType = document.createElement("select");
                selectDataType.classList.add("form-control");

                selectDataType.name = "dataType";
            
                let option = document.createElement('option');
                option.value = "";
                option.textContent = "";
                selectDataType.appendChild(option);

                [
                    {
                        acceptedValues: "flw",
                        description: "Local Weather Forecast",
                    },
                    {
                        acceptedValues: "fnd",
                        description: "9-day Weather Forecast",
                    },
                    {
                        acceptedValues: "rhrread",
                        description: "Current Weather Report",
                    },
                    {
                        acceptedValues: "warnsum",
                        description: "Weather Warning Summary",
                    },
                    {
                        acceptedValues: "warningInfo",
                        description: "Weather Warning Information",
                    },
                    {
                        acceptedValues: "swt",
                        description: "Special Weather Tips",
                    }
                ]
                .forEach(({acceptedValues, description}) => {
                    let option = document.createElement('option');
                    option.value = acceptedValues;
                    option.textContent = description;
                    selectDataType.appendChild(option);
                });

                return [ selectDataType, "Select Data Type" ];
            })
        );

        form.appendChild(
            createFormGroup(function() {
                const selectLang = document.createElement("select");
                selectLang.classList.add("form-control");

                selectLang.name = "lang";

                let option = document.createElement('option');
                option.value = "";
                option.textContent = "";
                selectLang.appendChild(option);
            
                [
                    {
                        acceptedValues: "en",
                        description: "English",
                    },
                    {
                        acceptedValues: "tc",
                        description: "Traditional Chinese",
                    },
                    {
                        acceptedValues: "sc",
                        description: "Simplified Chinese",
                    }
                ]
                .forEach(({acceptedValues, description}) => {
                    let option = document.createElement('option');
                    option.value = acceptedValues;
                    option.textContent = description;
                    selectLang.appendChild(option);
                });
                
                return [selectLang, "Select Language" ];
            })
        );

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.classList.add("btn");
        submitButton.classList.add("btn-primary");
        submitButton.innerText = "Submit";

        form.appendChild(submitButton);

        playgroundDiv.appendChild(form);
    }


    function createFormGroup(callback) {
        const formGroupDiv = document.createElement("div");
        formGroupDiv.classList.add("form-group");

        const [inputElement, labelText] = callback();

        const formGroupLabel = document.createElement("label");
        formGroupLabel.innerText = labelText;
        formGroupLabel.htmlFor = inputElement;

        formGroupDiv.appendChild(formGroupLabel);
        formGroupDiv.appendChild(inputElement);

        return formGroupDiv;
    }

    createForm();
})();