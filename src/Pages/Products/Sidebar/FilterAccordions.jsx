import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FilterAccordions = () => {
  const [expanded, setExpanded] = useState(false);
  const [categoryChecks, setCategoryChecks] = useState({
    all: false,
    mensClothing: false,
    mensTshirt: false,
    mensPants: false,
    womensClothing: false,
    accessories: false,
  });
  const [brandChecks, setBrandChecks] = useState({
    all: false,
    puma: false,
    adidas: false,
    nike: false,
  });
  const [sellerChecks, setSellerChecks] = useState({
    all: false,
    didiKala: false,
    official: false,
  });
  const [colorChecks, setColorChecks] = useState({
    all: false,
    black: false,
    charcoal: false,
    lightBlue: false,
    silver: false,
    yellow: false,
  });

  // مدیریت تغییر آکاردیون
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // مدیریت چک‌باکس‌های دسته‌بندی
  const handleCategoryCheck = (name) => (event) => {
    const checked = event.target.checked;
    if (name === 'all') {
      setCategoryChecks({
        all: checked,
        mensClothing: checked,
        mensTshirt: checked,
        mensPants: checked,
        womensClothing: checked,
        accessories: checked,
      });
    } else {
      const newChecks = { ...categoryChecks, [name]: checked };
      newChecks.all = newChecks.mensClothing && newChecks.mensTshirt && newChecks.mensPants && newChecks.womensClothing && newChecks.accessories;
      setCategoryChecks(newChecks);
    }
  };

  // مدیریت چک‌باکس‌های برند
  const handleBrandCheck = (name) => (event) => {
    const checked = event.target.checked;
    if (name === 'all') {
      setBrandChecks({
        all: checked,
        puma: checked,
        adidas: checked,
        nike: checked,
      });
    } else {
      const newChecks = { ...brandChecks, [name]: checked };
      newChecks.all = newChecks.puma && newChecks.adidas && newChecks.nike;
      setBrandChecks(newChecks);
    }
  };

  // مدیریت چک‌باکس‌های فروشنده
  const handleSellerCheck = (name) => (event) => {
    const checked = event.target.checked;
    if (name === 'all') {
      setSellerChecks({
        all: checked,
        didiKala: checked,
        official: checked,
      });
    } else {
      const newChecks = { ...sellerChecks, [name]: checked };
      newChecks.all = newChecks.didiKala && newChecks.official;
      setSellerChecks(newChecks);
    }
  };

  // مدیریت چک‌باکس‌های رنگ
  const handleColorCheck = (name) => (event) => {
    const checked = event.target.checked;
    if (name === 'all') {
      setColorChecks({
        all: checked,
        black: checked,
        charcoal: checked,
        lightBlue: checked,
        silver: checked,
        yellow: checked,
      });
    } else {
      const newChecks = { ...colorChecks, [name]: checked };
      newChecks.all = newChecks.black && newChecks.charcoal && newChecks.lightBlue && newChecks.silver && newChecks.yellow;
      setColorChecks(newChecks);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* آکاردیون دسته‌بندی */}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.125)',
          borderRadius: '4px',
          backgroundColor: '#fff',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="headingOne"
          sx={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 0,
            },
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, textAlign: 'right', width: '100%' }}>
            دسته‌بندی
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '1.25rem', display: expanded === 'panel1' ? 'block' : 'none' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <FormControlLabel
              control={<Checkbox checked={categoryChecks.all} onChange={handleCategoryCheck('all')} id="customCheck1" />}
              label="همه"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={categoryChecks.mensClothing} onChange={handleCategoryCheck('mensClothing')} id="customCheck2" />}
              label="لباس مردانه"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={categoryChecks.mensTshirt} onChange={handleCategoryCheck('mensTshirt')} id="customCheck3" />}
              label="تیشرت مردانه"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={categoryChecks.mensPants} onChange={handleCategoryCheck('mensPants')} id="customCheck4" />}
              label="شلوار مردانه"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={categoryChecks.womensClothing} onChange={handleCategoryCheck('womensClothing')} id="customCheck5" />}
              label="لباس زنانه"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={categoryChecks.accessories} onChange={handleCategoryCheck('accessories')} id="customCheck6" />}
              label="اکسسوری"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* آکاردیون برند */}
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.125)',
          borderRadius: '4px',
          backgroundColor: '#fff',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="headingTwo"
          sx={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 0,
            },
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, textAlign: 'right', width: '100%' }}>
            برند
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '1.25rem', display: expanded === 'panel2' ? 'block' : 'none' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <FormControlLabel
              control={<Checkbox checked={brandChecks.all} onChange={handleBrandCheck('all')} id="customCheck7" />}
              label="همه"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={brandChecks.puma} onChange={handleBrandCheck('puma')} id="customCheck8" />}
              label="پوما"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={brandChecks.adidas} onChange={handleBrandCheck('adidas')} id="customCheck9" />}
              label="آدیداس"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={brandChecks.nike} onChange={handleBrandCheck('nike')} id="customCheck10" />}
              label="نایک"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* آکاردیون فروشنده */}
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.125)',
          borderRadius: '4px',
          backgroundColor: '#fff',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="headingThree"
          sx={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 0,
            },
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, textAlign: 'right', width: '100%' }}>
            فروشنده
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '1.25rem', display: expanded === 'panel3' ? 'block' : 'none' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <FormControlLabel
              control={<Checkbox checked={sellerChecks.all} onChange={handleSellerCheck('all')} id="customCheck11" />}
              label="همه"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={sellerChecks.didiKala} onChange={handleSellerCheck('didiKala')} id="customCheck12" />}
              label="دیدی کالا"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
            <FormControlLabel
              control={<Checkbox checked={sellerChecks.official} onChange={handleSellerCheck('official')} id="customCheck13" />}
              label="فروشنده رسمی برند"
              sx={{ marginBottom: 0, direction: 'rtl' }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* آکاردیون رنگ‌ها */}
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.125)',
          borderRadius: '4px',
          backgroundColor: '#fff',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="headingFour"
          sx={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 0,
            },
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, textAlign: 'right', width: '100%' }}>
            رنگ‌ها
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '1.25rem', display: expanded === 'panel4' ? 'block' : 'none' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FormControlLabel
                control={<Checkbox checked={colorChecks.all} onChange={handleColorCheck('all')} id="customCheck14" />}
                label="همه"
                sx={{ marginBottom: 0, direction: 'rtl' }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem',justifyContent: 'space-between' }}>
              <FormControlLabel
                control={<Checkbox checked={colorChecks.black} onChange={handleColorCheck('black')} id="customCheck15" />}
                label="مشکی"
                sx={{ marginBottom: 0, direction: 'rtl' }}
              />
              <Box className="filter-color" sx={{ width: '20px', height: '20px', backgroundColor: 'black', borderRadius: '50%' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' ,justifyContent: 'space-between'}}>
              <FormControlLabel
                control={<Checkbox checked={colorChecks.charcoal} onChange={handleColorCheck('charcoal')} id="customCheck16" />}
                label="نوک مدادی"
                sx={{ marginBottom: 0, direction: 'rtl' }}
              />
              <Box className="filter-color" sx={{ width: '20px', height: '20px', backgroundColor: '#36454F', borderRadius: '50%' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem',justifyContent: 'space-between' }}>
              <FormControlLabel
                control={<Checkbox checked={colorChecks.lightBlue} onChange={handleColorCheck('lightBlue')} id="customCheck17" />}
                label="آبی روشن"
                sx={{ marginBottom: 0, direction: 'rtl' }}
              />
              <Box className="filter-color" sx={{ width: '20px', height: '20px', backgroundColor: '#87CEEB', borderRadius: '50%' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem',justifyContent: 'space-between' }}>
              <FormControlLabel
                control={<Checkbox checked={colorChecks.silver} onChange={handleColorCheck('silver')} id="customCheck18" />}
                label="نقره‌ای"
                sx={{ marginBottom: 0, direction: 'rtl' }}
              />
              <Box className="filter-color" sx={{ width: '20px', height: '20px', backgroundColor: '#C0C0C0', borderRadius: '50%' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem',justifyContent: 'space-between' }}>
              <FormControlLabel
                control={<Checkbox checked={colorChecks.yellow} onChange={handleColorCheck('yellow')} id="customCheck19" />}
                label="زرد"
                sx={{ marginBottom: 0, direction: 'rtl' }}
              />
              <Box className="filter-color" sx={{ width: '20px', height: '20px', backgroundColor: '#FFFF00', borderRadius: '50%' }} />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterAccordions;