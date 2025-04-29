import React, { useState } from 'react';
import { freeRates, paidRates } from '../utils/helper';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('free');
  const [subs, setSubs] = useState(100);
  const [subscriberLocation, setSubscriberLocation] = useState('Top');
  const [trafficQuality, setTrafficQuality] = useState('Top');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSubs(100);
  };

  const handleSubsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) setSubs(value);
  };

  const getEarnings = () => {
    const rateTable = activeTab === 'free' ? freeRates : paidRates;
    return Math.round(subs * rateTable[trafficQuality][subscriberLocation]);
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='py-5 px-4'>
        <div className='py-[13px] mb-[19px] px-[17px] border-[rgb(237_38_110)] border rounded-full w-fit mx-auto'>
          <p className='uppercase text-[rgb(0_5_14)]'>Increase Revenue</p>
        </div>
        <h1 className="text-5xl max-w-[562px] max-lg:max-w-[500px] max-md:max-w-[370px] mx-auto mt-5 font-bold leading-[58px] text-center max-lg:text-[38px] max-md:text-[28px] max-md:leading-[34px] max-lg:leading-[46px]">
          Calculate Your Success With{" "}
          <span className="relative text-underline">Hellofans</span>
        </h1>
        <p className='text-center mt-4'>Identify purchase intent and optimize offers in real time.</p>
        <div className="max-w-[1140px] mx-auto pt-12 flex flex-col lg:flex-row justify-between max-lg:items-center gap-10">
          <div className="w-full max-w-xl flex flex-col max-lg:items-center">
            <div className="flex items-center space-x-4 mb-[22px] border border-[#ed2076] rounded-[137px] p-1 w-fit">
              <button
                className={`cursor-pointer py-4 px-[22px] font-semibold rounded-full ${activeTab === 'paid'
                  ? 'bg-gradient-to-r from-[#ed2076] to-[#f0493b] text-white'
                  : 'text-black'
                  }`}
                onClick={() => handleTabClick('paid')}
              >
                Paid Account
              </button>
              <button
                className={`cursor-pointer py-4 px-[22px] font-semibold rounded-full ${activeTab === 'free'
                  ? 'bg-gradient-to-r from-[#ed2076] to-[#f0493b] text-white'
                  : 'text-black'
                  }`}
                onClick={() => handleTabClick('free')}
              >
                Free Account
              </button>
            </div>

            <div className="mb-4 flex flex-col max-lg:items-center">
              <label className="font-bold text-xl mb-1">Number of new subscribers monthly</label>
              <p className="w-full max-w-[333px] text-4xl max-sm:text-2xl font-medium border border-[rgb(237_38_110)] rounded-lg p-4 max-sm:p-2 mb-2">
                {subs.toLocaleString()}
              </p>
              <input
                type="range"
                min="100"
                max="30000"
                step="100"
                value={subs}
                onChange={handleSubsChange}
                className="w-full max-w-[333px] appearance-none  bg-transparent"
                style={{ zIndex: 10 }}
              />
              <div className="relative flex justify-between w-full max-w-[333px] mt-2">
                {Array.from({ length: 40 }).map((_, index) => {
                  const tickValue = 100 + index * ((30000 - 100) / 40);
                  const isFilled = subs >= tickValue;

                  return (
                    <span
                      key={index}
                      className={`w-[2px] h-4 rounded-sm ${isFilled ? 'bg-gradient-to-r from-[#ed2076] to-[#f0493b]' : 'bg-gray-300'
                        }`}
                    ></span>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xl font-semibold mb-2">Subscriber location</label>
              <div className="flex gap-4 max-sm:gap-[10px] border border-[rgb(237_38_110)] w-fit p-3 max-sm:p-2 rounded-md">
                {['Top', 'Medium', 'Low'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSubscriberLocation(level)}
                    className={`cursor-pointer max-sm:text-sm px-10 py-3 max-sm:px-8 max-sm:py-[10px] rounded-md font-semibold ${subscriberLocation === level
                      ? 'bg-gradient-to-r from-[#ed2076] !rounded-[27px] to-[#f0493b] text-white'
                      : '!rounded-[27px] text-black border border-[rgb(237_38_110)]'
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xl font-semibold mb-2">Traffic quality</label>
              <div className="flex gap-4 max-sm:gap-[10px] border border-[rgb(237_38_110)] w-fit p-3 max-sm:p-2 rounded-md">
                {['Top', 'Medium', 'Low'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setTrafficQuality(level)}
                    className={`cursor-pointer max-sm:text-sm px-10 py-3 max-sm:px-8 max-sm:py-[10px] rounded-md font-semibold ${trafficQuality === level
                      ? '!rounded-[27px] bg-gradient-to-r from-[#ed2076] to-[#f0493b] text-white'
                      : '!rounded-[27px] text-black border border-[rgb(237_38_110)]'
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#ed2076] to-[#f0493b] text-white px-10 py-10 rounded-lg shadow-lg w-full min-w-[529px] max-sm:min-w-full h-fit text-center">
            <h3 className="text-xl font-semibold mb-2">Estimated monthly earnings</h3>
            <div className="text-5xl font-medium mb-[34px] mt-[26px]">${getEarnings().toLocaleString()}</div>
            <button className="cursor-pointer font-bold py-[14px] px-[30px] border border-white rounded-full hover:bg-white hover:text-pink-600 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
