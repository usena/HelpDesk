import express from 'express';
import {createFaq} from '../controllers/faq.js';
import FAQ from '../models/Faq.js';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: FAQ
 *     description: FAQ related operations
 */

/**
 * @openapi
 * /createFaq:
 *   post:
 *     tags:
 *       - Faq
 *     summary: Add a new FAQ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "how r u"
 *               answer:
 *                 type: string
 *                 example: "dying"
 *     responses:
 *       '200':
 *         description: Add faq successfully
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/createFaq", createFaq)

router.get('/getFaq', async (req, res) => {
  const faqs = await FAQ.find();
  res.json(faqs);
});

router.put('/updateFaq/:id', async (req, res) => {
  const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedFAQ);
});

router.delete('/deleteFaq/:id', async (req, res) => {
  await FAQ.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
