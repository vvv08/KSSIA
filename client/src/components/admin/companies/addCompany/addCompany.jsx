import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addCompany.scss";
import { useFormik } from "formik";
import { addCompanyAdmin } from "../../../../repository/companiesRepository";
import SelectedList from "../../selectedList/selectedList";
import { getDistrictsAdmin } from "../../../../repository/misc";

const AddCompanyForm = () => {
  const navigate = useNavigate();
  const [contactState, setContactState] = useState("");
  const [keywordState, setKeywordState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [lists, setLists] = useState({
    contacts: [],
    keywords: [],
    company_image: null,
  });

  const onSubmit = () => {
    setIsLoading(true);
    addCompanyAdmin({ ...values, ...lists })
      .then(() => {
        alert("Company added");
        navigate("/admin");
      })
      .catch((err) => {
        alert("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      company_name: "",
      company_about: "",
      company_website: "",
      company_address: "",
      district: "",
    },
    onSubmit,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 4 * 1024 * 1024) {
      setLists((state) => ({ ...state, company_image: e.target.files[0] }));
    } else {
      alert("Please choose an image file smaller than 4MB.");
      e.target.value = null; // Reset the file input
    }
  };

  const addKeyword = () => {
    if (!keywordState) return;
    setLists((state) => {
      if (!state.keywords.includes(keywordState)) {
        return {
          ...state,
          keywords: [...state.keywords, keywordState],
        };
      } else {
        return state;
      }
    });
    setKeywordState("");
  };

  const removeKeyword = (item) => {
    setLists((state) => {
      return {
        ...state,
        keywords: state.keywords.filter((i) => i !== item),
      };
    });
  };

  const addContact = () => {
    if (!contactState) return;
    setLists((state) => {
      if (!state.contacts.includes(contactState)) {
        return {
          ...state,
          contacts: [...state.contacts, contactState],
        };
      } else {
        return state;
      }
    });
    setContactState("");
  };

  const removeContact = (item) => {
    setLists((state) => {
      return {
        ...state,
        contacts: state.contacts.filter((i) => i !== item),
      };
    });
  };

  useEffect(() => {
    getDistrictsAdmin().then((result) => {
      setDistricts(result);
    }).catch(() => {
      navigate('/admin')
    });
  }, []);

  return (
    <>
      <div className="kssia_addCompanyFormWrapper">
        <div className="kssia_addCompanyFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="kssia_addCompanyForm_1">
              <label htmlFor="company_name">Company name</label>
              <input
                value={values.company_name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="company_name"
                type="text"
                required
              />
            </div>
            <div className="kssia_addCompanyForm_district">
              <label htmlFor="district">Choose district</label>
              {districts && (
                <select
                  value={values.district}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="district"
                  type="text"
                  required
                >
                  <option value="">Select</option>
                  {districts.map((obj) => {
                    return (
                      <option value={obj.district_name} key={obj.district_id}>
                        {obj.district_name}
                      </option>
                    );
                  })}
                </select>
              )}
              {values.district && <p>{values.district}</p>}
            </div>
            <div className="kssia_addCompanyForm_2">
              <label htmlFor="company_about">About</label>
              <textarea
                value={values.company_about}
                onChange={handleChange}
                onBlur={handleBlur}
                id="company_about"
                rows="4"
                cols="50"
              ></textarea>
            </div>
            <div className="kssia_addCompanyForm_3">
              <label htmlFor="company_website">Website</label>
              <input
                value={values.company_website}
                onChange={handleChange}
                onBlur={handleBlur}
                id="company_website"
                type="text"
              />
            </div>
            <div className="kssia_addCompanyForm_4">
              <label htmlFor="company_address">Address</label>
              <input
                value={values.company_address}
                onChange={handleChange}
                onBlur={handleBlur}
                id="company_address"
                type="text"
                required
              />
            </div>
            <div className="kssia_addCompanyForm_5">
              <label htmlFor="company_contact">Add Contact</label>
              <input
                value={contactState}
                onChange={(e) => {
                  setContactState(e.target.value);
                }}
                id="company_contact"
                type="text"
              />
              <button
                className="kssia_addCompanyFor_addbtn"
                onClick={(e) => {
                  e.preventDefault();
                  addContact();
                }}
              >
                Add contact
              </button>
            </div>
            {lists.contacts[0] && (
              <SelectedList
                list_array={lists.contacts}
                removeMethod={removeContact}
              />
            )}
            <div className="kssia_addCompanyForm_6">
              <label htmlFor="company_keyword">Add keywords</label>
              <input
                id="company_keyword"
                type="text"
                value={keywordState}
                onChange={(e) => {
                  setKeywordState(e.target.value);
                }}
              />
              <button
                className="kssia_addCompanyFor_addbtn"
                onClick={(e) => {
                  e.preventDefault();
                  addKeyword();
                }}
              >
                Add keyword
              </button>
            </div>
            {lists.keywords[0] && (
              <SelectedList
                list_array={lists.keywords}
                removeMethod={removeKeyword}
              />
            )}
            <div className="kssia_addCompanyForm_7">
              <label htmlFor="company_image">Company Image :</label>
              <p>
                (allowed : ".png", ".jpg", ".jpeg", ".gif",".webp") | size
                should be less than 4Mb
              </p>
              <div className="kssia_addCompanyForm_7_image">
                <input
                  onChange={handleImageChange}
                  id="company_image"
                  type="file"
                  accept="image/*"
                  required
                />
                {lists.company_image && (
                  <img
                    src={URL.createObjectURL(lists.company_image)}
                    alt={values.company_name}
                  />
                )}
              </div>
            </div>

            <div className="kssia_formSubmitContainer">
              <button
                type="submit"
                className={
                  isLoading
                    ? "kssia_formSubmitButton_processing"
                    : "kssia_formSubmitButton"
                }
                disabled={isLoading}
              >
                {isLoading ? "adding..." : "Add Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCompanyForm;
