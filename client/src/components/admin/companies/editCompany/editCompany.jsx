import React, { useState, useEffect } from "react";
import "./editCompany.scss";
import { getDistrictsAdmin } from "../../../../repository/misc";
import { useParams, useNavigate } from "react-router-dom";
import {
  editCompany,
  getEditCompDetails,
} from "../../../../repository/companiesRepository";
import SelectedList from "../../../admin/selectedList/selectedList";

const EditCompanyForm = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [contactState, setContactState] = useState("");
  const [keywordState, setKeywordState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState({
    company_id: "",
    company_name: "",
    company_about: "",
    company_image: "",
    company_website: "",
    address: "",
    keywords: [],
    contacts: [],
    district: "",
  });

  const addContact = () => {
    if (!contactState) return;
    setCompany((state) => {
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
    setCompany((state) => {
      return {
        ...state,
        contacts: state.contacts.filter((i) => i !== item),
      };
    });
  };

  const addKeyword = () => {
    if (!keywordState) return;
    setCompany((state) => {
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
    setCompany((state) => {
      return {
        ...state,
        keywords: state.keywords.filter((i) => i !== item),
      };
    });
  };

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "company_name": {
        setCompany((state) => ({ ...state, company_name: e.target.value }));
        break;
      }
      case "company_about": {
        setCompany((state) => ({ ...state, company_about: e.target.value }));
        break;
      }
      case "address": {
        setCompany((state) => ({ ...state, address: e.target.value }));
        break;
      }
      case "district": {
        setCompany((state) => ({ ...state, district: e.target.value }));
        break;
      }
      case "company_website": {
        setCompany((state) => ({ ...state, company_website: e.target.value }));
        break;
      }
      case "company_image": {
        const file = e.target.files[0];
        if (file && file.size <= 4 * 1024 * 1024) {
          setCompany((state) => ({
            ...state,
            company_image: e.target.files[0],
          }));
        } else {
          alert("Please choose an image file smaller than 4MB.");
          e.target.value = null; // Reset the file input
        }
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (confirm("Are you sure?")) {
      editCompany(company)
        .then((result) => {
          alert("Company edited successfully");
          navigate("/admin");
        })
        .catch((err) => {
          alert("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getDistrictsAdmin().then((result) => {
      setDistricts(result);
    });
    getEditCompDetails(companyId)
      .then((result) => {
        setCompany({
          company_id: companyId,
          company_name: result[0].company_name,
          company_about: result[0].company_about,
          company_image: result[0].company_image,
          company_website: result[0].company_url,
          address: result[0].address,
          keywords: result[2],
          contacts: result[1],
          district: result[0].district,
        });
      })
      .catch(() => {
        navigate("/admin");
      });
  }, []);

  return (
    <>
      <div className="kssia_editCompanyFormWrapper">
        <div className="kssia_editCompanyFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="kssia_editCompanyForm_1">
              <label htmlFor="company_name">Company name</label>
              <input
                value={company.company_name}
                id="company_name"
                name="company_name"
                type="text"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="kssia_editCompanyForm_district">
              <label htmlFor="district">Choose district</label>
              {districts[0] && (
                <select
                  value={company.district}
                  id="district"
                  name="district"
                  type="text"
                  onChange={handleInputChange}
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
              <p>{company.district}</p>
            </div>
            <div className="kssia_editCompanyForm_2">
              <label htmlFor="company_about">About</label>
              <textarea
                value={company.company_about}
                id="company_about"
                name="company_about"
                rows="4"
                cols="50"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="kssia_editCompanyForm_3">
              <label htmlFor="company_website">Website</label>
              <input
                value={company.company_website}
                id="company_website"
                name="company_website"
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="kssia_editCompanyForm_4">
              <label htmlFor="company_address">Address</label>
              <input
                value={company.address}
                id="address"
                name="address"
                type="text"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="kssia_editCompanyForm_5">
              <label htmlFor="company_contact">Add Contact</label>
              <input
                id="company_contact"
                type="text"
                value={contactState}
                onChange={(e) => {
                  setContactState(e.target.value);
                }}
              />
              <button
                className="kssia_editCompanyFor_addbtn"
                onClick={(e) => {
                  e.preventDefault();
                  addContact();
                }}
              >
                Add contact
              </button>
            </div>
            <SelectedList
              list_array={company.contacts}
              removeMethod={removeContact}
            />
            <div className="kssia_editCompanyForm_6">
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
                className="kssia_editCompanyFor_addbtn"
                onClick={(e) => {
                  e.preventDefault();
                  addKeyword();
                }}
              >
                Add keyword
              </button>
            </div>
            <SelectedList
              list_array={company.keywords}
              removeMethod={removeKeyword}
            />
            <div className="kssia_editCompanyForm_7">
              <label htmlFor="company_image">Company Image :</label>
              <p>
                (allowed : ".png", ".jpg", ".jpeg", ".gif",".webp") | size
                should be less than 4Mb
              </p>
              <div className="kssia_editCompanyForm_7_image">
                <input
                  id="company_image"
                  name="company_image"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                {typeof company.company_image === "string" ? (
                  <img src={company.company_image} alt={company.company_name} />
                ) : (
                  <img
                    src={URL.createObjectURL(company.company_image)}
                    alt={company.company_name}
                  />
                )}
              </div>
            </div>

            <div className="kssia_editformSubmitContainer">
              <button
                type="submit"
                className={
                  isLoading
                    ? "kssia_editformSubmitButton_processing"
                    : "kssia_editformSubmitButton"
                }
                disabled={isLoading}
              >
                {isLoading ? "Editing..." : "Edit Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCompanyForm;
