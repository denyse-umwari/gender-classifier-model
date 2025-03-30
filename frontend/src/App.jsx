import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faQuestion } from '@fortawesome/fontawesome-svg-core';

export default function App()
{
  const [ formData, setFormData ] = useState( {
    long_hair: 0,
    forehead_width_cm: 12.5,
    forehead_height_cm: 6.0,
    nose_wide: 0,
    nose_long: 0,
    lips_thin: 0,
    distance_nose_to_lip_long: 0,
  } );
  const [ prediction, setPrediction ] = useState( null );
  const [ isLoading, setIsLoading ] = useState( false );

  const handleChange = ( e ) =>
  {
    const { name, value, type } = e.target;
    setFormData( {
      ...formData,
      [ name ]: type === 'number' ? parseFloat( value ) : parseInt( value ),
    } );
  };

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    setIsLoading( true );
    try
    {
      const res = await axios.post( "http://localhost:8000/predict", formData );
      setPrediction( res.data.gender );
    } catch ( err )
    {
      console.error( "Prediction error:", err );
      setPrediction( "error" );
    } finally
    {
      setIsLoading( false );
    }
  };

  const getGenderIcon = () =>
  {
    if ( !prediction ) return <FontAwesomeIcon icon={ faQuestion } className="text-gray-400" size="3x" />;
    if ( prediction === "Male" ) return <FontAwesomeIcon icon={ faMars } className="text-blue-500" size="3x" />;
    if ( prediction === "Female" ) return <FontAwesomeIcon icon={ faVenus } className="text-pink-500" size="3x" />;
    return <FontAwesomeIcon icon={ faQuestion } className="text-red-500" size="3x" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Gender Classifier
        </h1>

        <form onSubmit={ handleSubmit } className="space-y-5">

          { [ 'forehead_width_cm', 'forehead_height_cm' ].map( ( field ) => (
            <div key={ field }>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                { field.replace( /_/g, ' ' ) }
              </label>
              <input
                type="number"
                step="0.1"
                name={ field }
                value={ formData[ field ] }
                onChange={ handleChange }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          ) ) }


          { [ 'long_hair', 'nose_wide', 'nose_long', 'lips_thin', 'distance_nose_to_lip_long' ].map( ( field ) => (
            <div key={ field }>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                { field.replace( /_/g, ' ' ) }
              </label>
              <select
                name={ field }
                value={ formData[ field ] }
                onChange={ handleChange }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={ 0 }>No</option>
                <option value={ 1 }>Yes</option>
              </select>
            </div>
          ) ) }

          <button
            type="submit"
            disabled={ isLoading }
            className={ `w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${ isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              }` }
          >
            { isLoading ? 'Predicting...' : 'Predict Gender' }
          </button>
        </form>

        {/* Result Display */ }
        { prediction && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
            <div className="flex justify-center mb-3">
              { getGenderIcon() }
            </div>
            <h2 className="text-xl font-semibold">
              Predicted Gender:{ " " }
              <span
                className={
                  prediction === "Male"
                    ? "text-blue-600"
                    : prediction === "Female"
                      ? "text-pink-600"
                      : "text-red-600"
                }
              >
                { prediction }
              </span>
            </h2>
            { prediction === "error" && (
              <p className="text-red-500 text-sm mt-2">
                Error occurred during prediction
              </p>
            ) }
          </div>
        ) }
      </div>
    </div>
  );
}