import React, { useContext } from "react";
import { UserInputInfo, Payload } from "../types";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { createQuerie } from "../controllers/quota";

interface UserDataProps {
  userInfo: UserInputInfo;
  showSubmitButton: boolean;
}

const UserProfile: React.FC<UserDataProps> = ({
  userInfo,
  showSubmitButton,
}) => {
  const handleSubmission = async () => {
    console.log("Submitting");

    const response = await createQuerie(state.userData);

    dispatch({
      type: "UPDATE_USER_INFO",
      payload: { calculatedData: response.data },
    });
  };
  const { state, dispatch } = useContext(DataContext);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    obj: Payload,
    type: string
  ) => {
    e.preventDefault();
    console.log(obj);
    dispatch({
      type: type,
      payload: obj,
    });
  };
  return (
    <div className="pt-3">
      <div className="card bg-neutral w-full p-2">
        <h1 className="card-title text-accent text-xl p-3 flex justify-center">
          {state.userData.name || "John Doe"}
        </h1>
        <div className="card-body">
          <div className="">
            <p className="text-xs text-secondary">Address</p>
            <input
              type="text"
              placeholder="Your address"
              className="input input-xs text-sm text-primary w-full"
              value={state.userData.street}
              onChange={(e) =>
                handleChange(
                  e,
                  { strValue: e.target.value, type: "street" },
                  "UPDATE_USER_INFO_STR"
                )
              }
            />
          </div>
          <div className="flex gap-2 w-full">
            <div className="">
              <p className="text-xs text-secondary">Postal code</p>
              <input
                type="text"
                placeholder="Postal code"
                className="input input-xs text-sm text-primary w-full"
                value={state.userData.postalCode}
                onChange={(e) =>
                  handleChange(
                    e,
                    { strValue: e.target.value, type: "postalCode" },
                    "UPDATE_USER_INFO_STR"
                  )
                }
              />
            </div>
            <div className="">
              <p className="text-xs text-secondary">City</p>
              <input
                type="text"
                placeholder="City"
                className="input input-xs text-sm text-primary w-full"
                value={state.userData.city}
                onChange={(e) =>
                  handleChange(
                    e,
                    { strValue: e.target.value, type: "city" },
                    "UPDATE_USER_INFO_STR"
                  )
                }
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="">
              <p className="text-xs text-secondary">Floor surface area (sqm)</p>
              <input
                type="number"
                placeholder="Your floor surface area (sqm)"
                className="input input-xs text-sm text-primary w-full"
                value={
                  state.userData.houseSqm === 0 ? "" : state.userData.houseSqm
                }
                onChange={(e) =>
                  handleChange(
                    e,
                    { numValue: Number(e.target.value), type: "houseSqm" },
                    "UPDATE_USER_INFO_NUM"
                  )
                }
              />
            </div>
            <div className="">
              <p className="text-xs text-secondary">Occupants</p>
              <input
                type="number"
                placeholder="Number of occupants"
                className="input input-xs text-sm text-primary w-full"
                value={
                  state.userData.occupants === 0 ? "" : state.userData.occupants
                }
                onChange={(e) =>
                  handleChange(
                    e,
                    { numValue: Number(e.target.value), type: "occupants" },
                    "UPDATE_USER_INFO_NUM"
                  )
                }
              />
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <div className="">
              <p className="text-xs text-secondary">Budget</p>
              <input
                type="number"
                placeholder="Budget"
                className="input input-xs text-sm text-primary w-full"
                value={state.userData.budget === 0 ? "" : state.userData.budget}
                onChange={(e) =>
                  handleChange(
                    e,
                    { numValue: Number(e.target.value), type: "budget" },
                    "UPDATE_USER_INFO_NUM"
                  )
                }
              />
            </div>
            <div className="">
              <p className="text-xs text-secondary">Timeframe</p>
              <input
                type="text"
                placeholder="The timeframe for the project"
                className="input input-xs text-sm text-primary"
                value={state.userData.urgency}
                onChange={(e) =>
                  handleChange(
                    e,
                    { numValue: Number(e.target.value), type: "urgency" },
                    "UPDATE_USER_INFO_NUM"
                  )
                }
              />
            </div>
          </div>

          <div className="block">
            <p className="text-xs text-secondary">Current heating solution</p>
            <select
              className="select select-xs text-primary w-full"
              value={state.userData.currentHeating}
              onChange={(e) =>
                handleChange(
                  e,
                  { strValue: e.target.value, type: "currentHeating" },
                  "UPDATE_USER_INFO_STR"
                )
              }
            >
              <option value="direct electric heating">
                Direct electric heating
              </option>
              <option value="oil">Oil</option>
              <option value="natural gas">Natural gas</option>
              <option value="district heating">District heating</option>
            </select>
          </div>

          <div className="block">
            <p className="text-xs text-secondary">Description</p>
            <textarea
              placeholder="Describe your house and your needs"
              className="input input-xs text-sm text-primary w-full h-24 p-2"
              value={state.userData.description}
              onChange={(e) =>
                handleChange(
                  e,
                  { strValue: e.target.value, type: "description" },
                  "UPDATE_USER_INFO_STR"
                )
              }
            />
          </div>
        </div>
        {showSubmitButton && (
          <div className="card-actions flex justify-center">
            <Link
              to="/calculations"
              className="btn btn-primary btn-wide"
              onClick={handleSubmission}
              state={userInfo}
            >
              Save new offer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
